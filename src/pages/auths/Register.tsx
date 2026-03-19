import { Button, Flex, Form, Input, Tooltip } from 'antd';
import trello from '@/assets/images/trello.svg';
import { Link } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/Auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const data = await response.json();

      if (response.ok) {
        alert('Đăng ký thành công!', data);
        navigate('/login');
      } else {
        alert('Đăng ký thất bại!', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name='basic'
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      layout='vertical'
      variant='underlined'
    >
      <div className='flex justify-center p-2 gap-2 items-center'>
        <img src={trello} alt='' />
        <h2 className='font-bold text-2xl'>Trello</h2>
      </div>
      <Form.Item
        label={
          <Flex gap={5}>
            <span>Tên đăng nhặp</span>
            <Tooltip title='Tên phải ít nhất 6 ký tự'>
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          </Flex>
        }
        name='userName'
        hasFeedback
        rules={[
          { required: true, type: 'string', message: '' },
          { min: 6, type: 'string', message: '' }
        ]}
        className='mb-2!'
      >
        <Input className='w-full' style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label={
          <Flex gap={5}>
            <span>Email</span>
            <Tooltip
              title={
                <Flex orientation='vertical'>
                  <span>Email phải đúng định dạng.</span>
                  <span>
                    Ví dụ: <u>abc@gmail.com</u>
                  </span>
                </Flex>
              }
            >
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          </Flex>
        }
        name='email'
        hasFeedback
        rules={[
          { required: true, message: '' },
          {
            type: 'email',
            message: ''
          }
        ]}
        className='mb-2!'
      >
        <Input className='w-full' style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label={
          <Flex gap={5}>
            <span>Mật khẩu</span>
            <Tooltip
              title={
                <Flex orientation='vertical'>
                  <span>Yêu cầu mật khẩu:</span>
                  <Flex orientation='vertical'>
                    <span>+ Chữ hoa</span>
                    <span>+ Chữ thường</span>
                    <span>+ Chữ số</span>
                    <span>
                      Ví dụ: <u>abcABC123</u>
                    </span>
                  </Flex>
                </Flex>
              }
            >
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          </Flex>
        }
        name='password'
        hasFeedback
        rules={[
          { required: true, message: '' },
          {
            pattern: /^(?=.*[A-Z]).+$/,
            message: ''
          },
          {
            pattern: /^(?=.*[a-z]).+$/,
            message: ''
          },
          {
            pattern: /^(?=.*\d).+$/,
            message: ''
          }
        ]}
        className='mb-4!'
      >
        <Input.Password className='w-full' style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name='confirm_password'
        label={
          <Flex gap={5}>
            <span>Nhập lại mật khẩu</span>
            <Tooltip title='Mật khẩu không khớp'>
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          </Flex>
        }
        hasFeedback
        rules={[
          {
            required: true
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('');
            }
          })
        ]}
        className='mb-2!'
      >
        <Input.Password className='w-full' style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item className='mb-2! flex justify-center'>
        <Link to='/login'>Đã có tài khoản!</Link>
      </Form.Item>

      <Form.Item className='mb-2!'>
        <Button block type='primary' htmlType='submit' className='border border-gray-100 py-2 px-4'>
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
