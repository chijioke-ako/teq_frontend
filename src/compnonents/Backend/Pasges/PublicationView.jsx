import { useNavigate, useParams, Link } from 'react-router-dom';
import Api from '../../Helper/Api';
import { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Container, Row } from 'react-bootstrap';
import { FaAngleLeft, FaPen } from 'react-icons/fa';

const style = {
  marginTop: '20px',
  marginBottom: '20px',
  border: 0,
};

function PublicationView() {
  const [publications, setPublications] = useState([]);
  // const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getPublication(id);
    }
  }, [id]);

  const getPublication = async (id) => {
    try {
      const response = await Api.get(`/publications/${id}`);
      setPublications(response.data.data);
    } catch (err) {
      // not in 200 response range
      //  setError(err.message);
      console.log(err, err);
    }
  };

 
  return (
    <>
      <Container
        fluid
        style={{
          backgroundColor: '#E1F0FF',
          height: '120px',
          marginTop: '-4px',
        }}
      >
        <div
          style={{
            fontSize: '28px',
            fontWeight: '700',
            marginLeft: '4rem',
            padding: '53px',
          }}
        >
          Publications
        </div>
      </Container>
      <Container
        style={{
          backgroundColor: '#E1F0FF',
          marginBottom: '20px',
          marginTop: '20px',
          borderRadius: '9px',
          paddingTop: '4px',
          paddingLeft: '12px',
          paddingBottom: '1px',
        }}
      >
        <div>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/HomeB' }}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">Admin</Breadcrumb.Item>
            <Breadcrumb.Item active> {publications.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Container>
      <Container>
        <Button style={{ background: '#337ab7', height: '34px' }}>
          <Link
            style={{ color: 'white', textDecoration: 'none' }}
            to="/HomeB/ViewAllPublication"
          >
            <FaAngleLeft />
            View All Publication
          </Link>
        </Button>
        <Button
          style={{
            background: '#337ab7',
            height: '34px',
            marginLeft: '0.5rem',
          }}
        >
          <Link
            style={{ color: 'white', textDecoration: 'none' }}
            to="/HomeB/ViewAllPublication"
          >
            <FaPen />
            Edit
          </Link>
        </Button>
      </Container>
      <Container>
        <hr style={style} />
      </Container>
      {/* <Container></Container> */}
      <Container>
        <Row>
          <Col sm={8}>
            <h5 style={{ fontWeight: 'bold' }}>Publication Title.</h5>

            <h3>{publications.title}</h3>
            <div style={{ textAlign: 'start' }}>
              {publications.length ? (
                <>
                  {publications.map((item, index) => (
                    <div key={index}>
                      <p>{item.sub_title}</p>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <label>
                    No sub-title currently available for this publication.
                  </label>
                </>
              )}
            </div>
            <img
              src={`http://localhost:8000/${publications.feature_image}`}
              alt=""
              style={{
                height: '48rem',
                marginTop: '14px',
                width: '100%',
                border: '1px solid thin #ddd',
                marginBottom: '10px',
                display: 'inline-block',
                backgroundColor: '#fff',
              }}
            />
          </Col>
          <Col sm={4}>2</Col>
        </Row>
      </Container>
      <div>
     
      </div>
     
    </>
  );
}

export default PublicationView;
