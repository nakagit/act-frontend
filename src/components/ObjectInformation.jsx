import React from 'react';
import { compose, withHandlers } from 'recompose';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { darken, lighten } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';

import withDataLoader from '../util/withDataLoader';
import memoizeDataLoader from '../util/memoizeDataLoader';
import actWretch from '../util/actWretch';
import CenteredCircularProgress from './CenteredCircularProgress';
import { objectTypeToColor } from '../util/utils';
import config from '../config.json';
import CreateFactDialog, { createFact } from './CreateFact/Dialog';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,

    height: `calc(100% - ${theme.spacing.unit * 2}px)`,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    flex: 1
  },
  info: {
    overflow: 'auto',
    flex: 1
  },
  actions: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  link: {
    cursor: 'pointer',
    color: theme.palette.text.primary,
    '&:hover': {
      color: lighten(theme.palette.text.primary, 0.2)
    },
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.shortest
    })
  },

  ...Object.keys(config.objectColors)
    .map(name => ({
      [name]: {
        color: config.objectColors[name],
        '&:hover': {
          color: darken(config.objectColors[name], 0.2)
        }
      }
    }))
    .reduce((acc, x) => Object.assign({}, acc, x), {})
});

const ObjectInformationComp = ({
  classes,
  data,
  onSearchClick,
  onCreateFactClick
}) => {
  const totalFacts = data.statistics.reduce((acc, x) => x.count + acc, 0);
  const objectColor = objectTypeToColor(data.type.name);
  return (
    <div className={classes.root}>
      <a onClick={onSearchClick}>
        <Typography
          variant='headline'
          className={`${classes.link} ${classes[data.type.name]}`}
        >
          <span>{data.value}</span>
        </Typography>
      </a>
      <Typography variant='subheading' gutterBottom>
        <span style={{ color: objectColor }}>{data.type.name}</span>
      </Typography>

      <div className={classes.info}>
        <Typography variant='body2' gutterBottom>
          {totalFacts} facts
        </Typography>
        {data.statistics.map(x => (
          <Typography key={x.type.id}>
            {x.type.name}: {x.count}
          </Typography>
        ))}
      </div>

      <div className={classes.actions}>
        <Button onClick={onCreateFactClick}>Create fact</Button>
        <CreateFactDialog />
      </div>
    </div>
  );
};

const dataLoader = ({ id }) =>
  actWretch
    .url(`/v1/object/uuid/${id}`)
    .get()
    .json(({ data }) => ({
      data
    }));

const memoizedDataLoader = memoizeDataLoader(dataLoader, ['id']);

export default compose(
  withDataLoader(memoizedDataLoader, {
    alwaysShowLoadingComponent: true,
    LoadingComponent: CenteredCircularProgress
  }),
  withStyles(styles),
  withHandlers({
    onSearchClick: ({ data, onSearchSubmit }) => () => {
      onSearchSubmit({
        objectType: data.type.name,
        objectValue: data.value
      });
    },
    onCreateFactClick: ({ data }) => () => {
      console.log('create fact', data);
      createFact(data);
    }
  })
)(ObjectInformationComp);
