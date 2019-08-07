import React from 'react'
import PropTypes from 'prop-types'
import deburr from 'lodash/deburr'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import requests from './requests'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

let suggestions = [];

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => { }, ref, ...other } = inputProps;

  return (
    <div>
      <TextField
        className={classes.textField}
        fullWidth
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.resize,
          },
        }}
        {...other}
      />
    </div>
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500, fontSize: 13 }}>
              {part.text}
            </span>
          ) : (
              <strong key={String(index)} style={{ fontWeight: 300, fontSize: 13 }}>
                {part.text}
              </strong>
            );
        })}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
      const keep =
        count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  root: {
    height: 20,
    flexGrow: 1
  },
  container: {
    position: 'relative',
    marginTop: 30
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(2),
  },
  textField: {
    width: '400px'
  },
  resize: {
    fontSize: 17
  },
});

class IntegrationAutosuggest extends React.Component {
  state = {
    single: '',
    popper: '',
    suggestions: [],
  };

  async componentDidMount() {
    suggestions = await requests.getAllCourses();
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  handleKeyPress = (e) => {
    let course = {}
    if (e.key === 'Enter' || e === 'buttonClick') {
      let arr = this.state.single.split('*')
      course['department'] = arr[0]
      course['course'] = arr[1]
      this.setState({ single: '' })
      this.props.getNewSchedules(course)
    }
  }

  handleButtonSubmit = () => {
    let course = {}
    let arr = this.state.single.split('*')
    course['department'] = arr[0]
    course['course'] = arr[1]
    this.setState({ single: '' })
    this.props.getNewSchedules(course)
  }

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <div className={classes.root} style={{ display: 'flex', justifyContent: 'left' }}>
        <div>
          <Autosuggest
            {...autosuggestProps}
            inputProps={{
              classes,
              placeholder: 'Search a Course Code',
              value: this.state.single,
              onChange: this.handleChange('single'),
              onKeyDown: this.handleKeyPress,
            }}
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion,
            }}
            renderSuggestionsContainer={options => (
              <Paper {...options.containerProps} square>
                {options.children}
              </Paper>
            )}
          />
        </div>
        <div className={classes.divider} />
        <div style={{ paddingTop: '20px', marginLeft: '-px' }}>
          {/* <Button onClick={this.handleButtonSubmit} variant="contained" className={classes.button}>
                Search
            </Button> */}
          <Fab size='small' color="primary" aria-label="add" className={classes.fab}>
            <AddIcon onClick={this.handleButtonSubmit} variant="contained" className={classes.button} />
          </Fab>
        </div>
      </div>
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);