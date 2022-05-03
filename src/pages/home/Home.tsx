import { Fragment } from 'react';
import PageTile from '../../components/PageTile';
import './Home.scss';

const Home: React.FC = () => {
    return (
        <Fragment>
            <PageTile
            accentPosition={'top'}
            accentColor={'#1179ff'}    
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                marginTop: '4rem',
            }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap-reverse',
                    justifyContent: 'center',
                    gap: '2rem',
                    margin: '2rem 3rem',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'end',
                        textAlign: 'center',
                    }}>
                        <h1 style={{
                            fontSize: '3rem',
                            textTransform: 'lowercase',
                            fontWeight: 'normal',
                            fontStretch: 'semi-expanded',
                            margin: '0',
                        }}
                        className={'fade-up'}>Jared Gibson</h1>
                        <p className={'fade-up'}>Software Engineer</p>
                    </div>
                    <div style={{
                        height: '20rem',
                        width: '20rem',
                        borderLeft: 'rgb(255, 63, 63) 0.5rem solid',
                    }}>
                        <img src={'/self_photo.jpg'}
                        alt=""
                        style={{
                            height: '20rem',
                            width: '20rem',
                            objectFit: 'cover',
                            objectPosition: 'right',
                        }}
                        className={'expand-out'}/>
                    </div>
                </div>
            </PageTile>
            <PageTile
            accentPosition={'right'}
            accentColor={'#eee'}    
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                marginTop: '2rem',
                padding: '2rem',
            }}>
                <p>
                    Welcome to my portfolio! I am a software engineer who also loves to explore, learn new things, and get work done!
                </p>
                <h2>More coming soon...</h2>
            </PageTile>
        </Fragment>
    )
}

export default Home;
