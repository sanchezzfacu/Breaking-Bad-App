import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'

export default function LandingPage() {
    return (
        <div className="landing">
            <Link className="link_landing" to="/home"><div className="landing_btn"><div className="font">INGRESAR</div></div></Link>
        </div>
    )
}