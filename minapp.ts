function miniApp(app){
    app.get('/get', (req, res) => {
        res.json({
            msg: 'code'
        })
    })
}

export { miniApp }
