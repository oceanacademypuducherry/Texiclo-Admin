import { useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { useWatch, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app';
import { setFormData } from '../redux';


export const FormSyncWatcher = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { control } = useFormContext();
  const watchedForm = useWatch({ control });

  const debouncedDispatch = useRef(
    debounce((data) => {
      dispatch(setFormData(data));
    }, 500) // 500ms debounce
  ).current;

  useEffect(() => {
    debouncedDispatch(watchedForm);
  }, [watchedForm, debouncedDispatch]);

  return null;
};
