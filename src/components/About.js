import React, { Component } from 'react'
import NavBar from './NavBar'
export class About extends Component {
    render() {
        return (


            <div>
                <div className='container my-3'>
                <h1 style={{textAlign:'center'}}>This React Js App is Created By Mohan Tayade</h1>
                <h2>About Us!</h2>
                <h3 style={{ textAlign: 'center' }}>
                    Welcome To <span id="W_Name1">NewsMan</span>
                </h3>
                <p>
                    NewsManis a Professional News Platform. Here we will provide you only
                    interesting content, which you will like very much. We're dedicated to
                    providing you the best of News, with a focus
                    on dependability and Daily newsletter . We're
                    working to turn our passion for News into a
                    booming. We hope you enjoy our News as much as we
                    enjoy offering them to you.
                </p>
                <p>
                    I will keep posting more important posts on my Website for all of you.
                    Please give your support and love.
                </p>
                <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Thanks For Visiting Our Site
                    <br />
                    <br />
                    <span
                        style={{
                            color: 'blue',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        Have a nice day!
                    </span>
                </p>
                </div>
            </div>
        )
    }
}

export default About
