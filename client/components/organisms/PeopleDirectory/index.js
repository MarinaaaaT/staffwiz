import PeopleDirectory from './PeopleDirectory';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      staffList: Object.keys(state.users).map(u => state.users[u]) ?? []
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      updateUsers: () =>
        dispatch({
          type: 'UPDATE_USERS'
        })
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PeopleDirectory)