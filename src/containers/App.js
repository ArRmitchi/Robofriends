import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchField, requestRobots } from '../action'

const mapStateToProps = state => {
    return {
        searchfield: state.searchRobots.searchfield,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onSearchRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {

    componentDidMount(){
        this.props.onSearchRobots();
    }

    render(){
        const { searchfield, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return isPending ?
            <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox SearchChange={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);