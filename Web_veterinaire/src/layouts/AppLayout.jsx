import {useEffect} from 'react';
import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MenuBar from '../components/MenuBar';


const { Content } = Layout;

const AppLayout = () => {
  const {sessionExpired} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionExpired) {
      message.error("Votre session a expiré. Veuillez vous reconnecter.");
      navigate('/login');
    }
  }, [sessionExpired, navigate]);

  return (
    <Layout style={{ minHeight: '25vh' }}>
      <MenuBar />
      <Content style={{ marginTop: '4rem', padding: '16px' }}>
        <Outlet /> 
      </Content>
    </Layout>
  );
};

export default AppLayout;
