
function compile(pt){
    if(pt instanceof RegExp){
        return pt;
    }
    else {
        let r = pt.split('/');
        let mandatory = [];
        let optional = [];
        for(let f of r) {
            if(f.charAt(0) == ':') {
                if(optional.length > 0 || f.charAt(f.length-1) == '?') {
                    if(f.charAt(f.length-1) != '?') {
                        throw 'unable to parse : you cannot use optional parameter before necessary item';
                    }
                    optional.push(f.substr(1,f.length-2));
                } else {
                    mandatory.push({
                        parameter : true,
                        value : f
                    });
                }
            } else if(optional.length > 0){
                throw 'unable to parse : you cannot use optional parameter before necessary item';
            } else {
                mandatory.push({ parameter: false, value : f});
            }
        }
        return {
            test (url){
                let r = url.split('/');
                if(r.length > mandatory.length + optional.length
                    || r.length < mandatory.length) {
                    return null;
                }
                let rs = {};
                for(var i=0;i<r.length;i++){
                    if(i >= mandatory.length){
                        rs[ optional[i - mandatory.length]] = r[i];
                    } else {
                        if(mandatory[i].parameter) {
                            rs[mandatory[i].value] = r[i];
                        }
                        else if(mandatory[i].value != r[i]) {
                            return null;
                        }
                    }
                }
                return rs;
            }
        }
    }
}
module.exports = class Router{
    constructor(){
        this.$patterns = [];
        this.$otherwise = [];
    }

    on ( a, fn ) {
        this.$patterns.push({
            pattern : compile(a),
            cb : fn
        });
        return this;
    }
    otherwise ( fn ) {
        this.$otherwise.push(fn);
        return this;
    }
    resolve( url ){
        let otherwise = true;
        for(let p of this.$patterns) {
            let rs = p.pattern.test(url);

            if(rs) {
                p.cb(rs);
                otherwise = false;
            }
        }
        if(otherwise){
            for(let o of this.$otherwise) {
                o();
            }
        }
        return this;
    }
}