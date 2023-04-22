import styled from "styled-components"
import FormLeftWrapper from "./components/FormLeftWrapper"
import FormRightWrapper from "./components/FormRightWrapper"
import { createContext,useState } from "react"

const formstate = createContext()

const form = () => {
    const [form, setForm] = useState({
        campaignTitle: "",
        story: "",
        requiredAmount: "",
        category: "education",
    });

    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");
    const [uploaded, setUploaded] = useState(false);

    const [storyUrl, setStoryUrl] = useState();
    const [imageUrl, setImageUrl] = useState();

    const FormHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const [image, setImage] = useState(null);

    const ImageHandler = (e) => {
        setImage(e.target.files[0]);
    }
  return (
    <formstate.Provider value={{form, setForm, image, setImage, ImageHandler, FormHandler, setImageUrl, setStoryUrl}}>
    <FormWrapper>
        <FormMain>
            <FormInputsWrapper>
                <FormLeftWrapper/>
                <FormRightWrapper/>
            </FormInputsWrapper>
        </FormMain>
    </FormWrapper>
    </formstate.Provider>
  )
}
const FormWrapper = styled.div`
    width: 100%;
    display:flex;
    justify-content:center;
`

const FormMain = styled.div`
    width:80%;
`

const FormInputsWrapper = styled.div`
    display:flex;
    justify-content:space-between ;
    margin-top:45px ;
`

const Spinner = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    justify-content:center ;
    align-items:center ;
`
const Address = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    display:flex ;
    flex-direction:column;
    align-items:center ;
    background-color:${(props) => props.theme.bgSubDiv} ;
    border-radius:8px;
`

const Button = styled.button`
    display: flex;
  justify-content:center;
  width:30% ;
  padding:15px ;
  color:white ;
  background-color:#00b712 ;
  background-image:
      linear-gradient(180deg, #00b712 0%, #5aff15 80%) ;
  border:none;
  margin-top:30px ;
  cursor: pointer;
  font-weight:bold ;
  font-size:large ;
`
export default form;
export {formstate};