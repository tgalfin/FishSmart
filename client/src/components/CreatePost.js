import React, { useContext } from 'react';
import { Form, Card } from 'semantic-ui-react';
import { useForm } from '../utilities/hooks';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../gql/gql';
import { AuthContext } from '../context/auth';
import FormError from '../components/FormError';
import { FETCH_POSTS_QUERY } from '../gql/gql';

function CreatePost (props) {
  const { user } = useContext(AuthContext);
  // errors get processed by handleFormErrors
  const { handleChange,
          onSubmit,
          handleFormErrors,
          values,
          errors    
        } = useForm(createPostCallback, { title: '', body: '' });
  
  const [createPost, { loading, data }] = useMutation(CREATE_POST, {
    // update(cache, { data: { newPost }}) {
      // update the cache when new post created so main page will render the post
      // see https://www.apollographql.com/docs/react/data/mutations/
      // cache.modify({
      //   fields: {
      //     getPosts (existingPosts = []) {
      //       const newPostRef = cache.writeFragment({
      //         data: newPost,
      //         fragment: gql `
      //           fragment NewPostRef on Post {
      //             id body createdAt username likeCount
      //             likes {
      //               username
      //             }
      //             commentCount
      //             comments {
      //               id username createdAt body
      //             }
      //           }
      //         `
      //       });
      //       return [... existingPosts, newPostRef];
      //       values.body = '';
      //       values.title ='';
      //     }
      //   }
      // })      
    // }
    // another way to modify cache is to read the entire query from cache,
    // append our new data to it, then write the query back to the cache:
    // createPost is destructured from data.createPost and stores the new post
    update(cache, { data: { createPost } }) {
      // get property getPosts from cache.readquery and asign it to cachedPostData
      const { getPosts : cachedPostData } = cache.readQuery({
        query: FETCH_POSTS_QUERY    // our gql file used to make the query initially
      });
      // write our combined data back to the cache
      cache.writeQuery({ 
        query: FETCH_POSTS_QUERY, 
        data: {
          getPosts: [createPost, ...cachedPostData]
        }
      }); 
        values.body = '';
        values.title ='';   
    }
    ,
    onError(err) {
      console.log(err)
      handleFormErrors(err);
    }
  });

  // elevate our createPost function so it can be called from useForm
  function createPostCallback() {
    createPost({variables: values});
  };


  return (
    <div style={{margin: '20px auto 10px auto', maxWidth: 400}}>
    <Card fluid  >
      <Card.Header style={{fontSize: 20, fontWeight: 'bold', padding: '10px 0px 0px 0px'}} textAlign='center' > 
        {user.username ? user.username : 'You must login to post'} 
      </Card.Header>
      <Card.Header content='Create a post' style={{fontSize: 20, fontWeight: 'bold', padding: '5px 0px 10px 0px'}} textAlign='center' /> 
    

      <Form fluid style={{width: 350, margin: '5px auto 5px auto', padding: '0px 10px 0px 10px'}} 
      error={errors ? true : false} onSubmit={onSubmit} className={loading ? 'loading' : ''}
      >
        <Form.Group fluid style={{paddingBottom: 10}}>
          <Form.Input
            width={16}  
            placeholder='post title' 
            type="text"
            name='title'
            value={values.title}
            onChange={handleChange}
            error={errors.errorFields && errors.errorFields.title}            
          />
        </Form.Group>
        <Form.Group >
          <Form.TextArea
            style={{marginBottom: 10}}
            width={16}
            placeholder='post body'
            type='body'
            name='body'
            value={values.body}
            onChange={handleChange}
            error={errors.errorFields && errors.errorFields.body}
          />
        </Form.Group> 
        {Object.keys(errors).length > 0 && (<FormError errors={errors.errorMessages} />)}
        <Form.Group style={{display: 'block'}}>
          <Form.Button style={{display: 'block', margin: '0px auto 0px auto'}} color='blue' type="submit">Submit</Form.Button>
        </Form.Group> 

      </Form>
    </Card>
    </div>
  )
};


export default CreatePost;



// const ADD_TODO = gql`
//   mutation AddTodo($type: String!) {
//     addTodo(type: $type) {
//       id
//       type
//     }
//   }
// `;