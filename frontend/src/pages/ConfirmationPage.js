import React from 'react';

import PageTitle from '../components/PageTitle';
import ConfirmationBox from '../components/ConfirmationBox';

import './ConfirmEmailPWPage.css';


const ConfirmationPage = () =>
{

    return(
        <div class="fpp">
            <PageTitle />
            <ConfirmationBox />
        </div>
    );
};

export default ConfirmationPage;