from flask import Flask, render_template, request
import ddddocr

app = Flask(__name__)


@app.route('/ocr', methods=['POST'])
def ocr_api():
    ocr = ddddocr.DdddOcr()
    img = request.files.get('image').read()
    r = ocr.classification(img)
    return ''.join(r)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8089)
