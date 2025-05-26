import QRCode from 'antd/es/qr-code'
import { useContext, useEffect, useState } from 'react'
import styles from './auth.module.scss'
import { socketConnections } from '../../config/socketConnections'
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { useAuthCredentials } from '../../hooks/auth/useAuthCredentials'
import { IPInfoContext } from 'ip-info-react'
import { useSetCookie } from '../../hooks/auth/useSetCookie'
import mainIcon from '../../assets/images/iconHeader.svg';

export const AuthComponent: React.FC = () => {
  const [authData, setAuthData] = useState({
    accessToken: "",
    refreshTokenId: "",
    userId: "",
  });
  const [tokenForTG, setTokenForTG] = useState("");
  const [socketId, setSocketId] = useState<string | undefined>("");
  const [qrUrl, setQrUrl] = useState("");
  const [fingerprint, setFingerprint] = useState("");
  const setCookie = useSetCookie();
  const userInfo = useContext(IPInfoContext);
  const ip = userInfo.ip || '0.0.0.1';
  const userAgent = navigator.userAgent;
  const socket = socketConnections.socketAuth;
  const { authCredentials, loading } = useAuthCredentials(userAgent);


  useEffect(() => {
    const getFingerprint = async () => {
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      setFingerprint(result.visitorId)
    }
    getFingerprint()
  }, [])

  useEffect(() => {
    if (loading) return;

    const accessToken = localStorage.getItem("accessToken");
    if (authCredentials?.isLogged && accessToken) {
      localStorage.setItem("fingerprint", fingerprint);
      window.location.href = "main";
      return;
    }

    if (authCredentials?.tokenForTG) {
      setTokenForTG(authCredentials.tokenForTG);
    }

    const handleConnect = () => {
      if (socket.id !== undefined && socket.id !== '') {
        setSocketId(socket.id);
      }
    };


    if (!socket.connected) {
      socket.connect();
    }
    socket.on('connect', handleConnect);
    return () => {
      socket.off('connect', handleConnect);
      socket.disconnect()
    };
  }, [authCredentials, fingerprint, loading]);

  useEffect(() => {
    if (!fingerprint || !tokenForTG || !ip || !userAgent || !socket) return
    const handleRequestInfo = (data: any) => {
      localStorage.setItem("fingerprint", fingerprint)
      socket.emit("responseFromClient", {
        fingerprint: fingerprint,
        userAgent: userAgent,
        ip: ip,
        token: tokenForTG,
      })
    }
    const handleAuthInfo = (authData: any) => {
      console.log(authData)
      setAuthData(authData)
    }
    const handleDisconnect = () => {
      console.log('Disconnected')
    };
    socket.on("requestInfo", handleRequestInfo)
    socket.on("receiveAuthInfo", handleAuthInfo)
    socket.on('disconnect', handleDisconnect)
    return () => {
      socket.off("requestInfo", handleRequestInfo);
      socket.off("receiveAuthInfo", handleAuthInfo);
      socket.disconnect();
    }
  }, [fingerprint, tokenForTG, ip])

  useEffect(() => {

    if (!authData.userId || authData.userId === 'false') return

    localStorage.setItem("accessToken", authData.accessToken)
    localStorage.setItem("userId", authData.userId)

    const handleLogin = async () => {
      await setCookie(authData.accessToken, authData.refreshTokenId);
      window.location.href = `main`
    }
    handleLogin()
  }, [authData, setCookie])

  useEffect(() => {
    if (socketId && tokenForTG) {
      console.log(tokenForTG)
      console.log(socketId)
      setQrUrl(
        tokenForTG && socketId
          ? `tg://resolve?domain=gm_metrics_bot&start=${encodeURIComponent(tokenForTG)}-${encodeURIComponent(socketId)}`
          : ""
      )
    }
  }, [socketId, tokenForTG])

  return (
    <div className={styles.body}>
      <span className={styles.text}>Для входа отсканируйте QR-код</span>
      <div className={styles.QR}>
        {!socketId || !tokenForTG ? (
          <span className={styles.loader}>
            <img
              src={mainIcon}
              alt="mainIcon"
            />
          </span>
        ) : tokenForTG && qrUrl ? (
          <div className={styles.telegram}>
            <QRCode errorLevel="H" value={qrUrl} />
            <a href={qrUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
              Или перейдите по ссылке
            </a>
          </div>
        ) : (  
          <span className={styles.loader}>
          <img
            src={mainIcon}
            alt="mainIcon"
          />
        </span>
        )}
      </div>
    </div>
  )
}