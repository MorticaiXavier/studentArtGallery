import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './photo.reducer';
import { IPhoto } from 'app/shared/model/photo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPhotoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Photo = (props: IPhotoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { photoList, match, loading } = props;
  return (
    <div>
      <h2 id="photo-heading">
        <Translate contentKey="studentArtGalleryApp.photo.home.title">Photos</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="studentArtGalleryApp.photo.home.createLabel">Create new Photo</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {photoList && photoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="studentArtGalleryApp.photo.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="studentArtGalleryApp.photo.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="studentArtGalleryApp.photo.image">Image</Translate>
                </th>
                <th>
                  <Translate contentKey="studentArtGalleryApp.photo.height">Height</Translate>
                </th>
                <th>
                  <Translate contentKey="studentArtGalleryApp.photo.width">Width</Translate>
                </th>
                <th>
                  <Translate contentKey="studentArtGalleryApp.photo.taken">Taken</Translate>
                </th>
                <th>
                  <Translate contentKey="studentArtGalleryApp.photo.uploaded">Uploaded</Translate>
                </th>
                <th>
                  <Translate contentKey="studentArtGalleryApp.photo.album">Album</Translate>
                </th>
                <th>
                  <Translate contentKey="studentArtGalleryApp.photo.tag">Tag</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {photoList.map((photo, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${photo.id}`} color="link" size="sm">
                      {photo.id}
                    </Button>
                  </td>
                  <td>{photo.title}</td>
                  <td>{photo.description}</td>
                  <td>
                    {photo.image ? (
                      <div>
                        {photo.imageContentType ? (
                          <a onClick={openFile(photo.imageContentType, photo.image)}>
                            <img src={`data:${photo.imageContentType};base64,${photo.image}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {photo.imageContentType}, {byteSize(photo.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{photo.height}</td>
                  <td>{photo.width}</td>
                  <td>{photo.taken ? <TextFormat type="date" value={photo.taken} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{photo.uploaded ? <TextFormat type="date" value={photo.uploaded} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{photo.album ? <Link to={`album/${photo.album.id}`}>{photo.album.title}</Link> : ''}</td>
                  <td>
                    {photo.tags
                      ? photo.tags.map((val, j) => (
                          <span key={j}>
                            <Link to={`tag/${val.id}`}>{val.name}</Link>
                            {j === photo.tags.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${photo.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${photo.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${photo.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="studentArtGalleryApp.photo.home.notFound">No Photos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ photo }: IRootState) => ({
  photoList: photo.entities,
  loading: photo.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
