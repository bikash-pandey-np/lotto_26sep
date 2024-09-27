import Layout from "./Components/Layout";

const Dashboard = ({accountInfo})=> {
    console.log('********AccountINFO***********',accountInfo);
    return(
        <Layout>
            <h1>Dashboard</h1>
        </Layout>
    );
}

export default Dashboard;
