import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Order from '../components/Order';

const AdditionPage: React.FC<RouteComponentProps> = (props): JSX.Element => {
	return <Order action="createAddition" title="Dodanie do stanu" {...props} />;
};

export default AdditionPage;
