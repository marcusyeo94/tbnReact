var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function SelectLanguage(props) {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
	
    return (
	<ul className='languages'>
	    {languages.map((lang) => (
		<li 
		    key={lang}
		    className={lang === props.selectedLang ? 'selected-text' : null}
		    onClick={props.updateLang.bind(null, lang)}>
		    {lang}
		</li>
	    ))}
	</ul>
     );
}

SelectLanguage.propTypes = {
    selectedLang: PropTypes.string.isRequired,
    updateLang: PropTypes.func.isRequired
}


function RepoGrid(props) {
    return (
	<ul className='repo-grid'>
	    {props.repos.map((repo, index) => (
		<li key={repo.name}>
		    <p className='repo-rank'>#{index + 1}</p>
		    <img 
			className='avatar'
			src={repo.owner.avatar_url}
			alt={'Avatar for ' + repo.owner.login}
		    />
		    <a href={repo.html_url}>
			{repo.name}
		    </a>
		    <p>@{repo.owner.login}</p>
		    <p>{repo.stargazers_count} stars</p>
		</li>
		
		))}

	</ul>
     )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
    constructor(props){
	super(props);
	this.state = {
	    selectedLang : 'All',
	    repos: null
	}
	this.updateLang = this.updateLang.bind(this);
    }
    componentDidMount(){
	this.updateLang(this.state.selectedLang);	
    }

    updateLang(lang) {
	this.setState({
	    selectedLang : lang,
	    repos: null
	});

	api.fetchPopularRepos(lang)
	    .then(function (response){
		this.setState(function() {return { repos: response}}
	    )}.bind(this));
    }

    render() {
	return (
		<div>
		    <SelectLanguage 
			selectedLang={this.state.selectedLang}
			updateLang={this.updateLang}
		    />
		    {this.state.repos === null ? <p>LOADING</p> : <RepoGrid 
			repos={this.state.repos} />}
		</div>
	)
    }
}

module.exports = Popular;
