
import NavbarOne from './components/Navbars/NavbarOne/NavbarOne';

export const App = () => {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#0c0d0e',
        backgroundImage: 'radial-gradient(circle at 50% 20%, #22262a 0%, #0c0d0e 80%)',
      }}
    >
      
      <NavbarOne />
    </main>
  );
};