import NavigationBar from './navigation/NavigationBar';
import { Box } from '@mui/material';

function MainLayout({ children }) {
	return (
		<Box display="flex" flex-direction="column">
			<NavigationBar />
			<Box width="100%" backgroundColor="#FFF" marginX="20px" marginY="20px">
				{children}
			</Box>
		</Box>
	);
}
export default MainLayout;
