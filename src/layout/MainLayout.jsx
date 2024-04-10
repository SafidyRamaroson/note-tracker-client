import NavigationBar from './navigation/NavigationBar';
import { Box } from '@mui/material';

function MainLayout({ children }) {
	return (
		<Box display="flex" flex-direction="column">
			<NavigationBar />
			<Box width="100%"  backgroundColor="#FFF" padding="20px 0px 0px 20px" marginTop="10px">
				{children}
			</Box>
		</Box>
	);
}
export default MainLayout;
