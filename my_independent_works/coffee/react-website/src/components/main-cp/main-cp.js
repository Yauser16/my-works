

import './main-cp.css';
import BeansLogoBlack from '../beanslogoblack/beanslogoblack';
import girlcoffee from '../images/girl-865304_1920.jpg';

const MainCp = () => {
    return (
        <section className="about__our__beans">
            <section className="about__coffee">
                <div className="wrapper">
                    <div className="about__img">
                        {<img src={girlcoffee} alt="about our beans" />}
                    </div>
                    <div className="about__text">
                    <div className="text">
                        <h4>About our beans</h4>
                        <BeansLogoBlack/>
                        <p>
                        Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. <br/><br/>
                        Afraid at highly months do things on at. Situation recommend objection do intention<br/>
                        so questions.<br/> As greatly removed calling pleased improve an. Last ask him cold feel<br/>
                        met spot shy want. Children me laughing we prospect answered followed. At it went<br/>
                        is song that held help face.
                        </p>
                    </div>
                    </div> 
                </div>
            </section>
            <div className="line"></div>
        </section>
    )
}
export default MainCp;
