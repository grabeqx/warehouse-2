import React, { useEffect, useState } from 'react';

import { getData } from '../actions/dbActions';
import OrderHistoryTable from '../containers/OrderHistoryTable';
import { THistoryRecord } from '../types/types';
import DownloadFabButton from './DonwloadFabButton';
import { RouteComponentProps } from 'react-router-dom';

const OrderHistoryDay: React.FC<RouteComponentProps> = (props): JSX.Element => {
	const [history, setHistory] = useState<THistoryRecord[]>([]);
	const [dataFetched, setDataFetched] = useState(false);
	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			let { data, status } = await getData({
				action: 'getOrderDayHistory'
			});

			if (status) {
				setDataFetched(true);
				setHistory(data);
			}
		};

		fetchData();

		return () => {
			setHistory([]);
		};
	}, [dataFetched]);

	return (
		<>
			{dataFetched && <OrderHistoryTable records={history} {...props} />}
			<DownloadFabButton />
		</>
	);
};

export default OrderHistoryDay;
