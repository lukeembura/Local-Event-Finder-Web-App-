import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useEvents } from '../contexts/EventContext';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
