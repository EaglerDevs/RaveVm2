function convertToPython() {
    var javaCode = document.getElementById('javaCode').value;

    // Automatically fix common Java syntax issues
    javaCode = fixSyntaxErrors(javaCode);

    // Convert Java to Python code
    var pythonCode = javaCode
        // Handle printing (System.out.println)
        .replace(/System\.out\.println\((.*?)\);/g, 'print($1)')

        // Handle Java main method and function signature
        .replace(/public\s+static\s+void\s+main\s*\(String\[\]\s+args\)/g, 'def main():')

        // Handle class declaration (remove the concept of public/private)
        .replace(/public\s+class\s+(\w+)/g, 'class $1:')
        .replace(/private\s+/g, '# Private - Not needed in Python')
        .replace(/protected\s+/g, '# Protected - Not needed in Python')

        // Handle inheritance and abstract classes (simplified)
        .replace(/extends\s+(\w+)/g, 'inherits from $1')
        .replace(/implements\s+(\w+)/g, 'implements $1')

        // Handle constructors (simplified)
        .replace(/public\s+(\w+)\(\)/g, 'def __init__(self):')

        // Handle Java types (simplified)
        .replace(/\bint\b/g, 'int')
        .replace(/\bboolean\b/g, 'bool')
        .replace(/\bString\b/g, 'str')
        .replace(/\bfloat\b/g, 'float')
        .replace(/\bdouble\b/g, 'float') // Convert double to float in Python

        // Handle array declaration and initialization
        .replace(/\b(\w+)\[\]\s+(\w+)\s*=\s*new\s+(\w+)\[\d+\];/g, '$2 = [$3() for _ in range($3)]') // Array initialization (simplified)
        .replace(/\b(\w+)\[\]\s+(\w+)\s*=\s*\{(.*?)\};/g, '$2 = [$3]') // Array initialization with values

        // Handle Java for loop
        .replace(/for\s*\(\s*(\w+)\s+(\w+)\s*=\s*(\d+)\s*;\s*(\w+)\s*<\s*(\d+)\s*;\s*(\w+)\+\+\)/g, 'for $2 in range($3, $5):')

        // Handle Java while loop
        .replace(/while\s*\((.*?)\)\s*\{/g, 'while $1:')

        // Handle if/else statement
        .replace(/if\s*\((.*?)\)\s*\{/g, 'if $1:')
        .replace(/else\s*\{/g, 'else:')

        // Handle return statements
        .replace(/\breturn\b/g, 'return')

        // Handle incorrect semicolons and brackets
        .replace(/;/g, '') // Remove all semicolons (they are not used in Python)
        .replace(/\{|\}/g, '') // Remove curly braces

        // Handle libraries (ArrayList, HashMap, etc.)
        .replace(/ArrayList<(\w+)>/g, 'list')
        .replace(/HashMap<(\w+),\s*(\w+)>/g, 'dict')
        .replace(/StringBuilder/g, 'str') // Simplified (you could map this to a StringBuilder-like class)

        // Handle LWJGL library references (basic mapping)
        .replace(/\borg\.lwjgl\.sys\.(\w+)\b/g, '# LWJGL Library: org.lwjgl.' + '$1')

    // Display the converted Python code
    document.getElementById('pythonCode').innerText = pythonCode;
}

// Function to fix common Java syntax errors
function fixSyntaxErrors(javaCode) {
    // Fix unclosed braces
    javaCode = fixUnclosedBraces(javaCode);

    // Fix missing semicolons (replace them with proper Python syntax)
    javaCode = fixSemicolons(javaCode);

    // Fix missing return statements
    javaCode = fixReturnStatements(javaCode);

    // Return fixed Java code
    return javaCode;
}

// Fix unclosed curly braces (mismatched brackets)
function fixUnclosedBraces(code) {
    let openBraces = (code.match(/{/g) || []).length;
    let closeBraces = (code.match(/}/g) || []).length;
    let braceDifference = openBraces - closeBraces;

    if (braceDifference > 0) {
        code += '} '.repeat(braceDifference);
    }

    return code;
}

// Fix missing semicolons (although they're not needed in Python, we can identify and remove them)
function fixSemicolons(code) {
    return code.replace(/;/g, '');
}

// Handle missing return statements in Java methods (add "return None" for void methods)
function fixReturnStatements(code) {
    // If a function doesn't have a return statement and is void in Java, add "return None" for Python
    return code.replace(/public\s+void\s+(\w+)\(.*\)\s*\{[\s\S]*\}/g, 'def $1(self):\n    return None');
}
