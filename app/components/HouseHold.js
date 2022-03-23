import React from 'react';

function HouseHold(user) {
    if(user.households === null) {
        return false;
    } else{
        return true;
    }
}

export default HouseHold;