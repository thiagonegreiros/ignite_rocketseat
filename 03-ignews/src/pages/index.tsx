import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styled from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string,
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home| ig.news</title>
      </Head>
      <main className={styled.contentContainer}>
        <section className={styled.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Menina codando" />
      </main>
    </>
  )
}

//* Client-side - Quando é uma informação que é carregada por alguma ação do 
//* usuário.
//* Server-side - Quando é necessário indexação, mas com informações em real time
//* Static Site Generation - Quando a gente precisa de indexação.


//? Quando eu quero fazer uma chamada via SSR (Server-side Rendering)
//? Eu sempre faço da página para o componente

//? O SSG (static site generation) é quando eu preciso que uma pagina que não muda
//? sempre mostre o mesmo resultado a todos os usúarios que acessarem a minha página.

//! O nome deve ser o exatamente getServerSideProps
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1Iso18ImplRrof5fuwS63Rrw');
  
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 horas
  }
} 