import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/services/rootSlice';

export const AppHeader: FC = () => <AppHeaderUI userName={useSelector(selectUser)?.name || ''} />;
