import EditStaff from './EditStaff';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    if( state.router.location.state?.staffMember ){
      return {
        staffMember: state.router.location.state.staffMember
      }
    }
    else{
      return {
        staffMember: state.user
      }
    }
  }

  export default connect(
    mapStateToProps
  )(EditStaff)
