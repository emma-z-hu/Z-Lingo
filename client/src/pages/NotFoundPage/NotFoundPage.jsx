import React from 'react';
import './NotFoundPage.scss';

function NotFoundPage() {
    return (
        <div className="not-found-page">
            <h1 className="not-found-page__title">404</h1>
            <p className="not-found-page__message">Can't find what you're looking for, sorry!</p>
        </div>
    );
}

export default NotFoundPage;
