import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './album.reducer';
import { IAlbum } from 'app/shared/model/album.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAlbumProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Album = (props: IAlbumProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { albumList, match, loading } = props;
  return (
    <div>
      <h2 id="album-heading">
        <Translate contentKey="studentArtGalleryApp.album.home.title">Albums</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="studentArtGalleryApp.album.home.createLabel">Create new Album</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {albumList && albumList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="studentArtGalleryApp.album.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="studentArtGalleryApp.album.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="studentArtGalleryApp.album.created">Created</Translate>
                </th>
                <th>
                  <Translate contentKey="studentArtGalleryApp.album.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {albumList.map((album, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${album.id}`} color="link" size="sm">
                      {album.id}
                    </Button>
                  </td>
                  <td>{album.title}</td>
                  <td>{album.description}</td>
                  <td>{album.created ? <TextFormat type="date" value={album.created} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{album.user ? album.user.name : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${album.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${album.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${album.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="studentArtGalleryApp.album.home.notFound">No Albums found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ album }: IRootState) => ({
  albumList: album.entities,
  loading: album.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Album);