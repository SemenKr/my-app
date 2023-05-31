 import {addChatItemActionCreator, updateNewChatTextActionCreator} from '../Redux/dialogs-reducer';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
 import {compose} from "redux";


let mapStateToProps = (state) => {
	return {
		dialogs: state.dialogPage,
	}
};
let mapDispatchToProps = (dispatch) => {
	return {
		sendMessage: () => {
			dispatch(addChatItemActionCreator())
		},
		updateNewChatText: (text) => {
			dispatch(updateNewChatTextActionCreator(text))
		},

	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs);

