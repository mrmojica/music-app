var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions/actions');
var Poster = require('./poster');

var Playlist = React.createClass({
	getInitialState: function() {
		return {
			checked: false
		}
	},

	selectedPoster: function(e) {
		var song = document.getElementById(this.props.num);
		song.volume = 0.2;
		e.preventDefault();
		this.props.dispatch(actions.fetchDataSelected(this.props.poster, this.props.name));
		this.setState({
			checked: true
		})
	},

	render: function() {
		document.addEventListener('play', function(e){
			var audios = document.getElementsByTagName('audio');
			for(var i = 0, len = audios.length; i < len;i++){
    			if(audios[i] != e.target){
        		audios[i].pause();
    			}
			}
		}, true);
		return (
		
			<div onClick={this.selectedPoster} className='musicList offset-sm-7 m-t-1'>
				
				<ul className='list-unstyled '>
				<li  className='singleSong'>
					<span>{this.props.num}</span>
					<img className='p-l-0.5' src={this.props.images} /> 
					<span className='p-l-1 m-r-0'>
					{this.props.name}, {this.props.artist} 
					</span>
					<audio id={this.props.num} controls="controls" src={this.props.song} onPlay={this.selectedPoster}>
						<source />
					</audio>
				</li>

				</ul>

			</div>
		
			);
	}

});


var Container = connect()(Playlist);

module.exports = Container;