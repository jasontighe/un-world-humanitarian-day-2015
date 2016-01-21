/* THANK YOU FOR DONATING */

import React, { PropTypes } from 'react';
import styles from './DonateError.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles)
class DonateError {
    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string,
        desc: PropTypes.string,
        cta: PropTypes.string,
        language: PropTypes.string,
        network: PropTypes.string
    };

    componentWillMount() {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    onSubmit() {
        window.location = `/donate/${this.props.language}/${this.props.network}`;
    }

    render() {
        console.log('DonateError.render -  this.props.network: ', this.props.network);
        console.log('DonateError.render -  this.props.language: ', this.props.language);

        return (
            <div className="DonateError module">
                <div className="row">
                    <div className="small-12 medium-12 large-12 columns">
                        <h3>{this.props.title}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="small-12 medium-6 large-4 large-offset-2 columns">
                        {this.props.desc}
                    </div>
                    <div className="small-12 medium-6 large-2 end columns">
                        <div className="tryAgainButton button blue" type="button" onClick={this.onSubmit.bind(this)}>
                            {this.props.cta}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//DonateError.defaultProps = {
//    title: 'An Error Has Occured',
//    desc: 'Share your donation',
//    cta: 'Please Try Again'
//};

export default DonateError;
