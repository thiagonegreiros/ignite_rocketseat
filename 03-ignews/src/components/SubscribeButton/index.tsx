import style from './styles.module.scss'

interface SubsribeButtonProps {
  priceId: string;
}

export function SubscribeButton({priceId}: SubsribeButtonProps) {
  return (
    <button
      type="button"
      className={style.subscribeButton}
    >
      Subscribe Now
    </button>
  );
}