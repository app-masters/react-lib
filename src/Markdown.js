import React from 'react';

const Minus = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 42 42" {...props}>
        <path fill={props.fill || 'black'} d="M0 19h42v4H0z" />
    </svg>)

const Plus = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 42 42" {...props}>
        <path fill={props.fill || 'black'} d="M42 19H23V0h-4v19H0v4h19v19h4V23h19z" />
    </svg>)

const Check = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 42 42" {...props}>
        <path fill={props.fill || 'black'} stroke-width="12.144" d="M14.2 35.387L39.395 10.19l-2.94-2.94L14.2 29.509l-8.818-8.819-2.94 2.94z" />
    </svg>)


const Star = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 55.867 55.867" {...props}>
        <path d="M55.818 21.578a1.002 1.002 0 0 0-.808-.681l-18.09-2.629-8.09-16.392a.998.998 0 0 0-1.792 0l-8.091 16.393-18.09 2.629a1.002 1.002 0 0 0-.555 1.705l13.091 12.76-3.091 18.018c-.064.375.09.754.397.978a.992.992 0 0 0 1.053.076l16.182-8.506 16.18 8.506a1 1 0 0 0 1.451-1.054l-3.09-18.017 13.091-12.761c.272-.267.37-.664.252-1.025z" />
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
                    return <a key={index}href={link} target='_blank' style={this.anchorStyle}>{text}</a>
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
                        return p1.replace('watch?v=','');
                    });
                    if (link !== repl) {
                        return <iframe key={key} width="560" height="350" style={{height: '50.25%', width: '100%'}} src={`https://www.youtube.com/embed/${link}`} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
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