import { signIn, useSession } from 'next-auth/client';
import { api } from '../../pages/api/api';
import { getStripeJs } from '../../services/stripe-js';
import style from './styles.module.scss'

interface SubsribeButtonProps {
  priceId: string;
}

export function SubscribeButton({priceId}: SubsribeButtonProps) {
  const [session] = useSession();
  
  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId })

    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <button
      type="button"
      className={style.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  );
}