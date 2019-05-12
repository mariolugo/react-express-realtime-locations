import React from 'react';

//Externals
import PropTypes from "prop-types";

import { Viewer } from "resium";
function MapComponent(props) {
    const { locationsArray, renderEntities } = props;
    return (
        <Viewer>
          {typeof locationsArray !== "undefined" &&
            locationsArray.length > 0 &&
            renderEntities()}
        </Viewer>
    );
};

MapComponent.propTypes = {
    locationsArray: PropTypes.array,
    renderEntities: PropTypes.func
};

export default MapComponent;