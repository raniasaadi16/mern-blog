import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import TopBar from '../components/TopBar';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import { returnErrors, clearErrors } from '../redux/actions/errorsAction';
import { createPost, clearMsg, updatePost } from '../redux/actions/postActions';
import { getCategories } from '../redux/actions/categoryActions';

export default function Write({post, pageTitle}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const isAuth = useSelector(state => state.auth.isAuth);
    const category = useSelector(state => state.category.category);
    const msg = useSelector(state => state.posts.msg);
    const err = useSelector(state => state.err)
    const [preview, setpreview] = useState(post ? post.picture : '');
    const [data, setdata] = useState(post ? {title: post.title , content: post.content, picture: post.picture, category: post.category && post.category._id} : {title: '',  content: '', picture: '', category: ''});
    const [selectedOption, setselectedOption] = useState(post ? {value: post.category && post.category.name, label : post.category && post.category.name} : null);
    const [loading, setloading] = useState(false);
    const [popup, setpopup] = useState(true);
    let options = [];
    category && category.map(cat => {
        options.unshift({value: cat.name, label: cat.name, id: cat._id});
    } );
    
    useEffect(() => {
        !post && dispatch(clearMsg());
        dispatch(getCategories());
    }, [])
    useEffect(() => {
        if(err.msg){
            setloading(false)
        }
    }, [err]);

    const upload = e => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(e.target.files[0]);
        if(e.target.files[0].type.split('/')[0] == 'image'){
            reader.onloadend = function (e) {
                setpreview(reader.result);
            }
            setdata({...data,picture: e.target.files[0]});
        }else{
            dispatch(returnErrors('please upload picture','fail'))
        }
    };

    const handleChange = (selectedOption) => {
        setselectedOption(selectedOption);
        if(post) return setdata({...data, category: selectedOption.id})
        setdata({...data, category: selectedOption.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearErrors());
        dispatch(clearMsg());
        setloading(true);

        if(post){
            const formData = new FormData();
            post.title !== data.title && formData.append('title',data.title);
            post.content !== data.content && formData.append('content',data.content);
            post.category !== data.category && formData.append('category',data.category);
            post.picture !== data.picture && formData.append('picture',data.picture);
            dispatch(updatePost(post._id,formData));
        }else{
            const formData = new FormData();
            formData.append('title',data.title);
            formData.append('content',data.content);
            formData.append('category',data.category);
            formData.append('picture',data.picture);
            console.log(formData)
            dispatch(createPost(formData));
        }

        if(msg){
            setpopup(true)
        }
    }
    const closepopup = () => {
        setpopup(false);
        setloading(false);
    }

    return (
        <div className='write mb-5'>
            {!isAuth && (
                <Redirect to='/login'/>
            )}
            {loading && <Loading text='Creating'/>}
            <TopBar/>
            {msg && (
                <div>
                    <div className="popup position-fixed w-100 h-100" style={{display: popup ? 'block' : 'none'}}>
                        <div className="px-3 py-2 mx-auto w-25 position-relative rounded content">
                            <button className='btn ml-auto' onClick={closepopup}>x</button>
                            <h3 className='text-center'>{msg}</h3>
                            <button className='btn bg-pink mx-auto d-block px-4 py-1' onClick={closepopup}>ok</button>
                        </div>
                    </div>
                </div>  
            )}
            <div className="container bg-white py-4 px-5 mt-5 rounded">
                <h3 className='text-center primary-color'>{pageTitle ? pageTitle : 'Write your post!'}</h3>
                {err.msg && <ErrorAlert error={err.msg}/>}
                <form className='mt-5' onSubmit={handleSubmit}>
                    <p className='fw-semibold mt-3'>Post Title</p>
                    <input type="text" className='w-100 border rounded py-1 px-2' value={data.title} onChange={(e)=> setdata({...data, title: e.target.value})}/>
                    <p className='fw-semibold mt-3'>Post Content</p>
                    <CKEditor editor={ ClassicEditor } data={post ? post.content : ''} text={post ? post.content : ''} onChange={ ( event, editor ) => {
                        const text = editor.getData();
                        //console.log( editor  );
                        setdata({...data, content: text});
                    } } />
                    <p className='fw-semibold mt-3'>Post Category</p>
                    <Select value={selectedOption} onChange={handleChange} options={options}/>
                    <p className='fw-semibold mt-3'>Post Picture</p>
                    <input type="file" id='file' style={{display:'none'}} onChange={upload}/>
                    <label htmlFor="file" className='primary-color' style={{cursor:'pointer'}}>Upload Picture</label>
                    <button className='btn bg-dark text-white px-5 py-2 d-block mt-3' type='submit'>Publish</button>
                </form>
            </div>
            <div className="mt-4 container">
                <h5 className="secondary-color">Preview</h5>
                {preview && (
                    <img src={`${preview}`} className='preview rounded' alt="" />
                )}
                <div className="mt-2">
                    <span className='fw-semibold'>by: <p className='author primary-color d-inline'>{user && `${user.firstName} ${user.lastName}`}</p></span>
                    <p className="tag bg-pink rounded px-2 py-1 ml-5 d-inline mb-0">#{selectedOption &&selectedOption.value}</p>
                    <div className="likes float-right fw-semibold d-inline"><i className="bi bi-heart-fill mr-2 primary-color"></i>0</div>
                </div>
                <h3 className='fw-semibold mt-3'>{data.title ? data.title : 'title'}</h3>
                {data.content && (
                    <div className="mt-2" dangerouslySetInnerHTML={{__html: `${data.content}`}} >
                    </div>
                )}
            </div>
        </div>
    )
}
