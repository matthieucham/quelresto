var React = require('react/addons');
var PageNotFound = React.createClass({
  render: function () {
    return (
      <Grid gutterBottom>
        <Row>
          <Col sm={12} className='text-center'>
            <PanelContainer noControls>
              <Panel>
                <PanelBody>
                  <Grid>
                    <Row>
                      <Col xs={12}>
                        <div>
                          <Icon style={{
                            fontSize: 288,
                            lineHeight: 1
                          }} glyph='icon-mfizz-ghost' />
                        </div>
                        <h1 style={{
                          marginBottom: 25,
                          marginTop: 0
                        }}>Page not found!</h1>
                      </Col>
                    </Row>
                  </Grid>
                </PanelBody>
              </Panel>
            </PanelContainer>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = PageNotFound;
