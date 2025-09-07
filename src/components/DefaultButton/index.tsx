import styles from './styles.module.css'


type defaultButtonProps = {
    icon: React.ReactNode
    color?: 'green' | 'red'
} & React.ComponentProps<'button'>;

export function DefaultButton({ icon, color = 'green', ...props }: defaultButtonProps) {
    return (
        <>
        <button className={`${styles.button} ${styles[color]}`}  {...props}>
            { icon }
        </button>
        </>
    );
} 




