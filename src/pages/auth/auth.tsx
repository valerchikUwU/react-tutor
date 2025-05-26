import { AuthComponent } from '../../components/auth/auth'
import styles from './auth.module.scss'
import { useTheme } from '../../hooks/useTheme';
export const LoginPage = () => {

    const { isDark, toggleTheme } = useTheme();

    return (
        <div className={styles.background}>
            <button
                onClick={toggleTheme}
                className={styles.themeToggle}
                aria-label="Toggle theme"
            >
                {isDark ? '☀️' : '🌙'}
            </button>
            <div className={styles.foreground}>
                <div><AuthComponent></AuthComponent></div>
            </div>
        </div>
    )
}