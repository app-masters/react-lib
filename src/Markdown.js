import React from 'react';

const Minus = (props) => (<svg style={props.style || {}} aria-hidden="true" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" xmlns="http://www.w3.org/2000/svg" height={props.height || '1em'} width={props.width || '1em'} viewBox="0 0 448 512">
    <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
</svg>)

const Plus = (props) => (<svg style={props.style || {}} aria-hidden="true" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" xmlns="http://www.w3.org/2000/svg" height={props.height || '1em'} width={props.width || '1em'} viewBox="0 0 448 512">
    <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
</svg>)

const Check = (props) => (<svg style={props.style || {}} aria-hidden="true" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" xmlns="http://www.w3.org/2000/svg" height={props.height || '1em'} width={props.width || '1em'} viewBox="0 0 512 512">
    <path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
</svg>)

const Star = (props) => (<svg style={props.style || {}} aria-hidden="true" data-prefix="fas" data-icon="asterisk" class="svg-inline--fa fa-asterisk fa-w-16" xmlns="http://www.w3.org/2000/svg" height={props.height || '1em'} width={props.width || '1em'} viewBox="0 0 512 512">
    <path fill="currentColor" d="M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z" />
</svg>)


class Markdown extends React.Component {
    constructor (props) {
        super(props);
        this.liStyle = {
            listStyle: 'none',
            display: 'flex',
            alignItems: 'center',
            ...this.props.liStyle
        };
        this.iconStyle = {
            margin: 6,
            ...this.props.iconStyle
        }
        this.anchorStyle = {
            ...this.props.anchorStyle
        }
    }
    startLines = (lines) => {
        this.lines = lines;
        return this;
    }
    matchStar = () => {
        this.lines = this.lines.map((line, index) => {
            if (typeof line !== 'string') {
                return line;
            } else {
                const repl = line.replace(/^\*\s(.*)$/, (match, p1) => {
                    return p1;
                });
                return line !== repl ? <li style={this.liStyle}><Star style={this.iconStyle} />{repl}</li> : line;
            }
        });
        return this;
    }
    matchMinus = (lines) => {
        this.lines = this.lines.map((line, index) => {
            if (typeof line !== 'string') {
                return line;
            } else {
                const repl = line.replace(/^\-\s(.*)$/, (match, p1) => {
                    return p1;
                });
                return line !== repl ? <li style={this.liStyle}><Minus style={this.iconStyle} />{repl}</li> : line;
            }
        });
        return this;
    }
    matchPlus = (lines) => {
        this.lines = this.lines.map((line, index) => {
            if (typeof line !== 'string') {
                return line;
            } else {
                const repl = line.replace(/^\+\s(.*)$/, (match, p1) => {
                    return p1;
                });
                return line !== repl ? <li style={this.liStyle}><Plus style={this.iconStyle} />{repl}</li> : line;
            }
        });
        return this;
    }
    matchCheck = (lines) => {
        this.lines = this.lines.map((line, index) => {
            if (typeof line !== 'string') {
                return line;
            } else {
                const repl = line.replace(/^\=\s(.*)$/, (match, p1) => {
                    return p1;
                });
                return line !== repl ? <li style={this.liStyle}><Check style={this.iconStyle} />{repl}</li> : line;
            }
        });
        return this;
    }
    matchLink = (lines) => {
        this.lines = this.lines.map((line, index) => {
            if (typeof line !== 'string') {
                return line;
            } else {
                const repl = line.replace(/\[([^\[\]]*)\]\(([^()]*\.[^.()]{2,})\)/, (match, p1, p2) => {
                    return `${p1}::${p2}`;
                });
                if (line !== repl) {
                    const [text, link] = repl.split('::');
                    return <a key={index} href={link} target='_blank' style={this.anchorStyle}>{text}</a>
                }
                return line;
            }
        });
        return this;
    }
    matchHeader = (lines) => {
        this.lines = this.lines.map((line, index) => {
            if (typeof line !== 'string') {
                return line;
            } else {
                let size = 0;
                const repl = line.replace(/^(\#+)\s(.*)$/, (match, p1, p2) => {
                    size = p1.length;
                    return p2;
                });
                if (line !== repl) {
                    switch (size) {
                        case 1:
                            return <h3 key={index}>{repl}</h3>
                        case 2:
                            return <h4 key={index}>{repl}</h4>
                        case 3:
                            return <h6 key={index}>{repl}</h6>
                    }
                }
                return line;
            }
        });
        return this;
    }
    matchMedia = () => {
        this.lines = this.lines.map((line, key) => {
            if (typeof line !== 'string') {
                return line;
            } else {
                const repl = line.replace(/^\[([^\[\]]*)\]$/, (match, p1) => {
                    return p1;
                });
                if (line !== repl) {
                    const link = repl.replace(/^(?:https?\:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.?be)\/(.+)$/, (match, p1) => {
                        return p1.replace('watch?v=', '');
                    });
                    if (link !== repl) {
                        return <iframe key={key} width="560" height="315" src={`https://www.youtube.com/embed/${link}`} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    } else {
                        return <img key={key} src={repl} />
                    }
                }
                return line;
            }
        })
        return this;
    }
    finish = () => {
        return this.lines.map((line, key) => {
            if (typeof line === 'string') {
                return <p key={key}>{line}</p>
            }
            return line;
        })
    }
    render () {
        const props = this.props;
        let lines = props.content.split('\n');
        const result = this.startLines(lines)
            .matchStar()
            .matchMinus()
            .matchPlus()
            .matchLink()
            .matchHeader()
            .matchCheck()
            .matchMedia()
            .finish();
        return result;
    }
}
Markdown.defaultProps = {
    content: ''
}

export default Markdown;