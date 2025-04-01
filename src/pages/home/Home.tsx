import MenuButton from '../../components/menu-button/MenuButton';
import PageTile from '../../components/PageTile';
import './Home.scss';

const Home: React.FC = () => {
    return (
        <div style={{
            maxWidth: '60rem',
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch'
          }}>
            <div style={{
              height: '4rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              margin: '0 1rem',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{
                  fontWeight: 'bold',
                  textTransform: 'lowercase',
                  border: 'solid #eee 0.2rem',
                  borderLeft: 'none',
                  borderRight: 'none',
                  padding: '0.2rem 1rem 0.3rem 1rem',
                }}>jg</span>
              </div>
              <div style={{flexGrow: '1'}}></div>
              <div style={{
                // display: 'flex',
                alignItems: 'center',
                display: 'none' // remove when ready
              }}>
                <MenuButton></MenuButton>
              </div>
            </div>
      
            <PageTile
            accentPosition={'top'}
            accentColor={'#1179ff'}    
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
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
        </div>
    )
}

export default Home;
