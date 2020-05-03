import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {upload, useSingleMedia, modifyFile} from '../hooks/ApiHooks';
import {
  Button,
  Grid,
  CircularProgress,
  Slider,
  Typography,
} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import BackButton from '../components/BackButton';
import useModifyForm from '../hooks/ModifyHooks';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Modify = ({history, match}) => {
  const [loading, setLoading] = useState(false);
  const file = useSingleMedia(match.params.id);

  const doModify = async () => {
    setLoading(true);
    try {
      const modifyObject = {
        title: inputs.title,
        description: JSON.stringify({
          desc: inputs.description,
          filters: {
            brightness: inputs.brightness,
            contrast: inputs.contrast,
            saturation: inputs.saturation,
            sepia: inputs.sepia,
          },
        }),
      };
      const result = await modifyFile(modifyObject, match.params.id);
      console.log(result);
      setTimeout(() => {
        setLoading(false);
        history.push('/myfiles');
      }, 2000);
    } catch (e) {
      console.log(e.message);
      // TODO: näytä vihe
    }
  };

  const {
    inputs,
    setInputs,
    handleInputChange,
    handleSubmit,
    handleSliderChange,
  } = useModifyForm(doModify);

  useEffect(() => {
    (async () => {
      if (file !== null) {
        const description = (JSON.parse(file.description));
        setInputs((inputs) => {
          return {
            title: file.title,
            description: description.desc,
            filename: file.filename,
            brightness: description.filters.brightness,
            contrast: description.filters.contrast,
            saturation: description.filters.saturation,
            sepia: description.filters.sepia,
          };
        });
      }
    })();
  }, [file, setInputs]);

  console.log('inputs', inputs);

  return (
    <>
      <BackButton />
      <Grid container>
        <Grid item xs={12}>
          <Typography component="h1" variant="h2" gutterBottom>
            Modify
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ValidatorForm
            onSubmit={handleSubmit}
            instantValidate={false}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid container item xs={12}>
                <TextValidator
                  fullWidth
                  label="Title"
                  type="text"
                  name="title"
                  value={inputs.title}
                  onChange={handleInputChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid container item xs={12}>
                <TextValidator
                  fullWidth
                  label="Description"
                  name="description"
                  value={inputs.description}
                  onChange={handleInputChange}
                  validators={[
                    "matchRegexp:^[a-öA-Ö]+(([',. -][a-öA-Ö ])?[a-öA-Ö]*)*$",
                  ]}
                  errorMessages={["text only"]}
                />
              </Grid>
              <Grid container item xs={12}>
                <Button
                  fullWidth
                  color="primary"
                  type="submit"
                  variant="outlined"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
          {loading && (
            <Grid item>
              <CircularProgress />
            </Grid>
          )}
          {inputs.filename.length > 0 && (
            <Grid item>
              <img
                style={{
                  filter: `
                 brightness(${inputs.brightness}%)
                 contrast(${inputs.contrast}%) 
                 saturate(${inputs.saturation}%)
                 sepia(${inputs.sepia}%)
                 `,
                  width: "100%",
                }}
                src={mediaUrl + inputs.filename}
                alt="preview"
              />
              <Typography>Brightness</Typography>
              <Slider
                name="brightness"
                value={inputs.brightness}
                min={0}
                max={200}
                step={1}
                onChange={handleSliderChange}
              />
              <Typography>Contrast</Typography>
              <Slider
                name="contrast"
                value={inputs.contrast}
                min={0}
                max={200}
                step={1}
                onChange={handleSliderChange}
              />
              <Typography>Saturation</Typography>
              <Slider
                name="saturation"
                value={inputs.saturation}
                min={0}
                max={200}
                step={1}
                onChange={handleSliderChange}
              />
              <Typography>Sepia</Typography>
              <Slider
                name="sepia"
                value={inputs.sepia}
                min={0}
                max={200}
                step={1}
                onChange={handleSliderChange}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

Modify.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default Modify;
