// pages/_app.js
import '../app/globals.scss';
import MainLayout from '../components/MainLayout/MainLayout';

function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
