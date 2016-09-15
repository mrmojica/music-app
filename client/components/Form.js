var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions/actions');
// var Boarder = require('./boarderList');
var Playlist = require('./musicPlayerList');

var Form = React.createClass({

	onSubmit: function(e) {
		e.preventDefault();
		var searchItem = this.refs.userInput.value;
		this.props.dispatch(actions.fetchData(searchItem));
		searchItem = '';
	},

	render: function() {
		console.log('music list', this.props.musicList);
		var list = this.props.musicList.map(function(value, index) {
			console.log("value",value.album.name);
			return (
				
			<div key={index}>
			
				<Playlist 
				key={index} 
				num={index+1} 
				poster={value.album.images[0].url}
				images={value.album.images[2].url}
				name={value.name} 
				artist={value.artists[0].name} 
				song={value.preview_url}/>
			</div>

			);
		});

		return (
		


			<div className="container">
			<div className=''> 
			<form className='text-xs-center input-group' onSubmit={this.onSubmit}>
				<input  className='form-control' type='text' placeholder='Type the name of a song' ref='userInput' required />
				<span className='input-group-btn'>	
				<button type='submit' className='btn btn-outline-secondary'>Search</button>
				</span>
			</form>
			</div>
			<div className='ScrollStyle'>

			
			{list}
			</div>
			
			</div>


			);
	}

});

var mapStateToProps = function(state, props) {
  return {
    musicList: state.musicList
  }
}

var Container = connect(mapStateToProps)(Form);

module.exports = Container;


