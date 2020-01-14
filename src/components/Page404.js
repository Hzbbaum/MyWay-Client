import React  from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div className = "main">
            The content you were looking for could not be found.
                click here to be redirected
                <Link className = "redirectButton" to = "/home" type="button">Home</Link>
        </div>
    )
}

export default Page404
