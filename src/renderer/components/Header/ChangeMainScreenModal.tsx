import * as React from 'react';
import {ChangeEvent, useState, useEffect} from "react";
import styled from "styled-components";
import { Field, Form, Formik } from 'formik';
import {FieldProps} from "formik";
import {LoadImageIcon} from '../../../assets/images/svg/LoadImageIcon'
import { connect } from 'react-redux';
import {
  switchMainScreenSettingsAction
} from '../../store/appReducer/appActions';
import { IMainScreenSettingsSwitcher } from '../../../types/appTypes';
import { RootState } from '../../store/rootReducer';

require('./Header.scss');

const Container = styled.div`
    padding:10px 9px 8px 9px;
    background: #444444;
    border-radius: 2px;
    text-align:center;
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow:hidden;
`;

const MainHeader = styled.h1`
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    color: #FFFFFF;
    margin:0;
    margin-bottom:10px;
`;
const InputContainer = styled.div<{height: string}>`
    width:156px;
    padding:8px;
    margin-top:4px;
    height:${({height}) => height };
    background: #222222;
    border-radius: 2px;
`;

const Button = styled.div`
    background: #2F80ED;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    width:140px;
    height:24px;
    font-style: normal;
    font-weight: 500;
    font-size: 8px;
    line-height: 9px;
    color: #FFFFFF;
    margin-top:8px;
    cursor:pointer;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const Header = styled.h2`
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 12px;
    color: #A1A1A1;
    margin:0;
    text-align:left;
`;

const InputWrapper = styled.div`
    height:30px;
    text-align:left;
`;

const InputTextHeader = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 8px;
    line-height: 9px;
    margin:0;
    color: #FFFFFF;
`;

const InputText = styled.input`
  background: #000000;
  border-radius: 2px;
  width:48px;
  height:18px;
  margin-top:4px;
  color:#FFF;
  &:focus {
    outline: none;
  }
`;

const RightInputText = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 8px;
  line-height: 18px;
  color: #FFFFFF;
  margin:0;
  margin-left:2px;
`;

const LoadImageConatainer = styled.div`
  position:relative;
  width:100%;
  height:104px;
  padding:4px;
  background: #000000;
  border-radius: 2px;
  margin-top:8px;
  cursor:pointer;
`;

const LoadImageBorder = styled.label`
  background: #000000;
  opacity: 0.4;
  border: 0.5px dashed #7F7F7F;
  border-radius: 2px;
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding: 0px 7px;
  padding-top:20px;
  cursor:pointer;
`;

const LoadImageTextConatainer = styled.div`
  margin-top:8px;
  width:100%;
  text-align:center;
  padding:5px;
  font-style: normal;
  font-weight: normal;
  font-size: 6px;
  color: #7F7F7F;
`;

const FileInput = styled.input`
  opacity: 0;
  visibility: hidden;
  position:absolute;
  width:0px;
  height:0px;
  padding:0px;
`;


const LoadedImage = ({src}: {src: string}) => (
  <img alt="picture" src={src} style={{width:"30px", height:"30px"}} />
);


const File = ({myName,currentValue,field: {onChange, ...field},form: {setFieldValue},...props}:FieldProps & {myName:string,currentValue:any}) => {
  const [src, setImageUrl] = useState<any>('');

  useEffect(() => {
    if(typeof currentValue === 'object'){
        // let reader = new FileReader();
        // reader.readAsDataURL(src);
        // reader.onload = function (e) {
        //     setImageUrl(e.target!.result);
        // }
        setImageUrl(URL.createObjectURL(currentValue));
    }
    return () => {
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        URL.revokeObjectURL(src)
    }
}, []);

  return (
    <span>
        <FileInput 
          type="file" 
          accept="image/*"
          id="fileInputMainScreen"
          onChange={(e: ChangeEvent<HTMLInputElement> | any) => {
            console.log(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
            setFieldValue(myName, e.target.files[0]);
          }}
          {...field}
          {...props} />
          <LoadImageBorder htmlFor={"fileInputMainScreen"}>
              {src ? <LoadedImage src={src} /> : <LoadImageIcon />}
              <LoadImageTextConatainer >
                Click on the area to load the image or drag and drop
              </LoadImageTextConatainer>
          </LoadImageBorder>
        {/* <FileInputSpan htmlFor={"fileInputMainScreen"} ></FileInputSpan> */}
    </span>
  )
}

interface IProps {
  closeModal:() => void
}

interface IConnectedProps {
  width:number,
  height:number,
  image:string,
  switchMainScreenSettingsAction: (payload: IMainScreenSettingsSwitcher) => void
}

const ChangeMainScreenModal: React.FC<IProps & IConnectedProps> = ({
                                          closeModal,
                                          switchMainScreenSettingsAction,
                                          width,
                                          height,
                                          image
                                        }) => {

  
    return (
      <Formik
          initialValues={{ width:width,height:height,image:image, _image:''}}
          onSubmit={(values: {width:number,height:number,image:string, _image:string}) => {
              switchMainScreenSettingsAction({
                width:values.width,
                height:values.height,
                image:values.image
              })
          }}>
          { ({values, submitForm, setFieldValue}) =>
              <Form>
                <Container>
                  <MainHeader>Scene settings</MainHeader>
                  <InputContainer height={"64px"}>
                    <Header>Scene</Header>
                    <div className="inputsContainer">
                      <InputWrapper>
                        <InputTextHeader>Width</InputTextHeader>
                        <Field 
                          name={"width"}
                          component={InputText}
                          onChange={(e: any) => {
                            if(parseInt(e.target.value) || e.target.value === ''){
                              setFieldValue('width',parseInt(e.target.value) || 0);
                            }
                          }}
                          value={values.width}/>
                          <RightInputText>cm</RightInputText>
                      </InputWrapper>
                      <InputWrapper>
                        <InputTextHeader>Height</InputTextHeader>
                        <Field 
                          name={"height"} 
                          component={InputText}
                          onChange={(e: any) => {
                            if(parseInt(e.target.value) || e.target.value === ''){
                              setFieldValue('height',parseInt(e.target.value) || 0);
                            }
                          }}
                          value={values.height}/>
                          <RightInputText>cm</RightInputText>
                      </InputWrapper>
                    </div>
                  </InputContainer>
                  <InputContainer height={"138px"}>
                    <Header>Image</Header>
                    <LoadImageConatainer>
                        <Field 
                          name="_image"
                          myName="image"
                          currentValue={values.image}
                          component={File}/>
                    </LoadImageConatainer>
                  </InputContainer>
                  <Button onClick={() => {
                    closeModal(); 
                    submitForm();
                  }}>Apply</Button>
                </Container>
              </Form>
          }
      </Formik>
    );
  };

  const mapStateToProps = (state: RootState) => ({
    width: state.app.mainScreenSettings.width,
    height: state.app.mainScreenSettings.height,
    image: state.app.mainScreenSettings.image,
  });

  export default connect(mapStateToProps, {
    switchMainScreenSettingsAction
  })(ChangeMainScreenModal);